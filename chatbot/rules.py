def get_chatbot_response(mongo, user_message):
    message = user_message.lower()

    rules = mongo.db.chatbot_rules.find()

    for rule in rules:
        for keyword in rule["keywords"]:
            if keyword in message:
                return rule["response"]

    return "I'm sorry, I couldn't understand that. Please ask about admissions, faculty, placements, or programmes."