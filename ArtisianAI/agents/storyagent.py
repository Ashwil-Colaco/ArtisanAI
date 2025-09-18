from google.adk.tools import Tool, ToolContext
from google.generativeai import configure, GenerativeModel

import os
from dotenv import load_dotenv

# Load from .env
load_dotenv()

# Get API key
api_key = os.getenv("GOOGLE_API_KEY")

# Configure Google Generative AI
configure(api_key=api_key)


class StorytellingAgent(Tool):
    name = "storytelling_agent"
    description = "Generates cultural and marketing stories for artisan products"

    def run(self, tool_context: ToolContext) -> dict:
        # Collect artisan/product details from context
        artisan_name = tool_context.state.get("artisan_name", "Unknown Artisan")
        craft_type = tool_context.state.get("craft_type", "handmade craft")
        product_name = tool_context.state.get("product_name", "unique item")
        region = tool_context.state.get("region", "India")

        # Prompt for storytelling
        prompt = f"""
        You are a cultural storyteller. 
        Create two outputs:
        1. A short product story (2-3 sentences) for an e-commerce listing. 
        2. A longer cultural narrative (150-200 words) connecting the artisan, {artisan_name}, 
           and their {craft_type} from {region} to heritage and modern buyers.
        Product: {product_name}.
        """

        model = GenerativeModel("gemini-1.5-flash")  # You can also use gemini-pro
        response = model.generate_content(prompt)

        return {
            "short_story": response.candidates[0].content.parts[0].text.split("\n")[0],
            "long_story": "\n".join(response.candidates[0].content.parts[0].text.split("\n")[1:])
        }
