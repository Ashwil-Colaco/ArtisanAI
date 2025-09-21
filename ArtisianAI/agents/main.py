# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from storyagent import storytelling_agent_func

app = FastAPI()

# Define Product schema matching your frontend payload
class Product(BaseModel):
    userId: str
    name: str
    category: str
    description: str
    problem: str
    benefits: str
    audience: str
    price: str
    discount: str
    buyLink: str
    brand: str
    contact: str
    videoUrl: Optional[str] = None

@app.post("/ai")
async def generate_ai_content(product: Product):
    """
    Receives product data from frontend and calls storytelling agent
    """
    state = {
        "artisan_name": product.brand,
        "craft_type": product.category,
        "product_name": product.name,
        "region": "India",
        "description": product.description,
        "price": product.price,
    }

    # Call AI function
    result = storytelling_agent_func(state)

    # Return AI result along with original product data
    return {
        "product": product.dict(),
        "ai_result": result
    }

