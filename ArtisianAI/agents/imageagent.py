from google.adk.tools import Tool, ToolContext
from google.generativeai import GenerativeModel

import os
from dotenv import load_dotenv

# Load from .env
load_dotenv()

# Get API key
api_key = os.getenv("IMAGE_API_KEY")


class ImageGenerationAgent(Tool):
    name = "image_generation_agent"
    description = "Generates marketing/product images for artisan products"

    def run(self, tool_context: ToolContext) -> dict:
        # Collect artisan/product details
        product_name = tool_context.state.get("product_name", "unique item")
        craft_type = tool_context.state.get("craft_type", "handmade craft")
        region = tool_context.state.get("region", "India")
        style = tool_context.state.get("style", "realistic photography")  # e.g. "digital art", "watercolor", etc.

        # Prompt for image generation
        prompt = f"""
        Generate a high-quality image of a {product_name}, 
        which is a {craft_type} from {region}. 
        The image should emphasize authenticity, craftsmanship, 
        and cultural heritage. Style: {style}.
        """

        # Initialize image model
        model = GenerativeModel("imagen-3.0")  # Adjust depending on available model
        response = model.generate_content(prompt, generation_config={"response_mime_type": "image/png"})

        # Return image URL(s) or base64
        return {
            "image_url": response.candidates[0].content.parts[0].inline_data.url
            if hasattr(response.candidates[0].content.parts[0], "inline_data")
            else None
        }