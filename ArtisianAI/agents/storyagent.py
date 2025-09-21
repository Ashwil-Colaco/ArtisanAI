import re
from google.generativeai import configure, GenerativeModel
import os
from dotenv import load_dotenv

# Load API key
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
configure(api_key=api_key)

def storytelling_agent_func(state: dict) -> dict:
    artisan_name = state.get("artisan_name", "Unknown Artisan")
    craft_type = state.get("craft_type", "handmade craft")
    product_name = state.get("product_name", "unique item")
    region = state.get("region", "India")
    product_description = state.get("description", "")
    product_price = state.get("price", "0")

    prompt = f"""
You are a cultural storyteller and marketing expert.
Create three outputs based on the following product information:
Product Name: {product_name}
Artisan: {artisan_name}
Craft Type: {craft_type}
Region: {region}
Description: {product_description}
Current Price: {product_price}

1. A short product story (2-3 sentences) for an e-commerce listing.
2. A longer cultural narrative (150-200 words).
3. A recommended price for the product in INR.
Return the response in numbered sections (1, 2, 3).
"""

    model = GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)

    response_text = response.candidates[0].content.parts[0].text

    # Use regex to extract 1, 2, 3 sections
    matches = re.findall(r"\d\.\s*(.+?)(?=\n\d\.|\Z)", response_text, re.S)

    short_story = matches[0].strip() if len(matches) > 0 else "Short story could not be generated."
    long_story = matches[1].strip() if len(matches) > 1 else "Long story could not be generated."
    recommended_price = matches[2].strip() if len(matches) > 2 else "Price recommendation could not be generated."

    return {
        "short_story": short_story,
        "long_story": long_story,
        "recommended_price": recommended_price
    }
