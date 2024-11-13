from flask import Flask, request, jsonify
import subprocess
import ollama

app = Flask(__name__)

def extract_actors(requirements):
    modelfile = '''
    FROM llama3.1:70b
    SYSTEM 	You are a software architect. Identify all human actors involved in the use case from the provided requirements. Importantly, the actors should be separated by commas. No explanation or introduction is needed. Return actors in Title Case and do not add period punctuation behind the last actor.
    '''
    ollama.create(model='Req2UseCaseStep1', modelfile=modelfile)
    response = ollama.chat(
        model='Req2UseCaseStep1',
        messages=[{'role': 'user', 'content': requirements}],
        stream=False
    )

    actors = response['message']['content'].strip().split(',')
    return [actor.strip() for actor in actors]

def extract_usecases(requirements, actors):
    modelfile = '''
    FROM llama3.1:70b
    SYSTEM 	You are a software architect. Identify the most important use cases from the provided requirements for each actor. Provide the output in the following format: actor1: usecase1, usecase2; actor2: usecase1, usecase2; ... No explanation or introduction is needed.
    '''
    ollama.create(model='Req2UseCaseStep2', modelfile=modelfile)
    actors_list = ', '.join(actors)
    message_content = f"{requirements}\n\nActors: {actors_list}"
    
    response = ollama.chat(
        model='Req2UseCaseStep2',
        messages=[{'role': 'user', 'content': message_content}],
        stream=False
    )
    
    use_cases_data = response['message']['content']
    actors_usecases = []
    
    sections = use_cases_data.strip().split(';')
    
    for section in sections:
        if section.strip():
            actor_part = section.split(':')
            if len(actor_part) == 2:
                actor = actor_part[0].strip()
                use_cases = [use_case.strip() for use_case in actor_part[1].split(',') if use_case.strip()]
                actors_usecases.append({
                    'actor': actor,
                    'useCases': use_cases
                })
    
    return actors_usecases


def extract_model(requirements, relationships):
    modelfile = '''
    FROM llama3.1:70b
    SYSTEM 	You are a software architect. Create a UseCase Diagram in PlantUML. Use the following UseCase Diagram as notation guidance: @startuml left to right direction skinparam packageStyle rect skinparam shadowing false actor Administrator as administrator actor :Mail-Server: as mail rectangle MitgliedHinzufügen { (Formular anzeigen) as anzeigen (Informationen ausfüllen) as ausfüllen (Erstellung bestätigen) as bestätigen (Mail senden) as senden administrator --> anzeigen administrator --> ausfüllen administrator --> bestätigen mail --> senden 	bestätigen .> senden : includes} @enduml Just give me the PlantUML code and only model with the actors and UseCases you receive. Remember, the name of the rectangle cannot include spaces, and UseCase names can only include letters and numbers. The rectangle represents the system so all UseCases need to included in the rectangle. Additionally, create a one UseCase Description for each UseCase in the following format: Title:? Description:? Actors:? Steps:? Provide the UseCase Description in JSON format. Just give me the JSON as a string. Important: always include jsonStart and jsonEnd in the json String! Take this as reference: ``` jsonStart[ { title: "verbNoun1", description: "Description of the first use case.", actors: ["Actor1", "Actor2"], steps: ["Step1", "Step2"], }, { title: "verbNoun3", description: "Description of the third use case.", actors: ["Actor1", "Actor2"], steps: ["Step1", "Step2"], }, { title: "verbNoun4", description: "Description of the fourth use case.", actors: ["Actor1", "Actor2"], steps: ["Step1", "Step2"], }, { title: "verbNoun5", description: "Description of the fifth use case.", actors: ["Actor1", "Actor2"], steps: ["Step1", "Step2"], }, ] jsonEnd
    '''
    ollama.create(model='Req2UseCaseStep3', modelfile=modelfile)
    message_content = f'''
    Model the use case diagram. The Relationships are: {relationships}. The requirements are: {requirements}. Let's go step by step: First, create the PlantUML diagram following these rules: add @startUML at the beginning and @endUML at the end, name of rectangle must be in pascal case, for correct modeling—actors labeled as :Actor Name:, use cases in parentheses or with usecase "Use Case Name", associations as -->, associations between usecases always with .> and then must follow a :extends or :includes at the end of the line, and custom titles as usecase "Title" as UC_Name; Secondly, define use case descriptions, including jsonStart and jsonEnd for decoding.
    '''    
    response = ollama.chat(
        model='Req2UseCaseStep3',
        messages=[{'role': 'user', 'content': message_content}],
        stream=False
    )
    
    diagram = response['message']['content'].strip()
    print(diagram)
    return diagram

def extract_refinement(message, plantUML, useCaseDescriptions):
    modelfile = '''
    FROM llama3.1:70b
    SYSTEM 	You are a software architects assistent you will receive PlantUML Code for a Use Case and a associated Use Case Descriptions. You will refinement instrcutions on how to edit the plantUML Code and the Use Case Description. Please return the refined PlantUML and Descriptions.
    '''
    ollama.create(model='Req2UseCaseStep4', modelfile=modelfile)
    message_content = f'''
    Refinement instrctions are: {message}. The plantUML code is the following: {plantUML}. The useCaseDescription is: {useCaseDescriptions}. Do not add new attributes to the useCasedescription. Important: Return the useCaseDescription as String and add at the beginning jsonStart and at the end jsonEnd. Let's go step by step: First, identify which parts need refinement the plantUML, the UseCase Descriptions or both. Secondly, once identified edit the according part and remember these rules for the PlantUML diagramm: add @startUML at the beginning and @endUML at the end, name of rectangle must be in pascal case, for correct modeling—actors labeled as :Actor Name:, use cases in parentheses or with usecase "Use Case Name", associations as -->, associations between usecases always with .> and then must follow a :extends or :includes at the end of the line, and custom titles as usecase "Title" as UC_Name; Finally include both the PlantUML and the UseCase Descriptions with jsonStart and the beginning and jsonEnd at the end, make sure the UseCase Descriptions can be parsed as json, so use double quotes. UC-X means the UseCase at X-th place of the usecase description array starting at 1.
    '''    
    response = ollama.chat(
        model='Req2UseCaseStep4',
        messages=[{'role': 'user', 'content': message_content}],
        stream=False
    )
    
    refinement = response['message']['content'].strip()
    print(refinement)
    return refinement


@app.route('/llama/model', methods=['POST'])
def generate_model():
    try:
        data = request.json
        requirements = data.get('requirements')
        relationships = data.get('relationships')

        if not requirements:
            return jsonify({'error': 'Requirements are missing'}), 400
        if not relationships:
            return jsonify({'error': 'Relationships are missing'}), 400

        diagram = extract_model(requirements, relationships)

        return jsonify({
            'diagram': diagram
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/llama/refine', methods=['POST'])
def refine_model():
    try:
        data = request.json
        message = data.get('message')
        plantUML = data.get('plantUML')
        useCaseDescriptions = data.get('useCaseDescriptions')


        if not message:
            return jsonify({'error': 'message is missing'}), 400
        if not plantUML:
            return jsonify({'error': 'plantUML is missing'}), 400
        if not useCaseDescriptions:
            return jsonify({'error': 'useCaseDescriptions is missing'}), 400   

        refinement = extract_refinement(message, plantUML, useCaseDescriptions)

        return jsonify({
            'refinement': refinement
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/llama/actors', methods=['POST'])
def generate_actors():
    try:
        data = request.json
        requirements = data.get('requirements')

        if not requirements:
            return jsonify({'error': 'Requirements are missing'}), 400

        actors = extract_actors(requirements)

        return jsonify({
            'actors': actors
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/llama/useCases', methods=['POST'])
def generate_usecase():
    try:
        data = request.json
        requirements = data.get('requirements')
        actors = data.get('actors')

        if not requirements:
            return jsonify({'error': 'Requirements are missing'}), 400

        useCases = extract_usecases(requirements, actors)

        return jsonify({
            'useCases': useCases
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
