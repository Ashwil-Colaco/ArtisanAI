# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from storyagent import storytelling_agent_func

# Define the request model
class ProductData(BaseModel):
    audience: str
    benefits: str
    brand: str
    buyLink: str
    category: str
    contact: str
    createdAt: str
    description: str
    discount: str
    name: str
    price: str
    problem: str

app = FastAPI()

@app.post("/generate_story/")
def generate_story(product_data: ProductData):
    # Prepare the state dictionary
    state = {
        "artisan_name": product_data.brand,
        "craft_type": product_data.category,
        "product_name": product_data.name,
        "region": "India",
        "description": product_data.description,
        "price": product_data.price
    }

    # Directly call the storytelling function
    result = storytelling_agent_func(state)
    return result
