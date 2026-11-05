from fastapi import APIRouter

router = APIRouter(
    prefix="/api/destinations",
    tags=["Destinations"]
)

destinations = [
    {
        "id": 1,
        "name": "Ella",
        "location": "Badulla, Sri Lanka",
        "category": "Nature",
        "description": "Beautiful mountains, waterfalls and scenic train journeys.",
        "budget": "Medium",
        "image": "https://th.bing.com/th/id/R.ba828cf81ed566828bf667eb75f435f0?rik=MC7z7fiiUVIsKQ&pid=ImgRaw&r=0"
    },
    {
        "id": 2,
        "name": "Sigiriya",
        "location": "Matale, Sri Lanka",
        "category": "Adventure",
        "description": "Explore the famous Sigiriya Rock Fortress.",
        "budget": "Medium",
        "image": "https://tkatours.com/wp-content/uploads/2022/09/sigiriya5.jpg"
    },
    {
        "id": 3,
        "name": "Galle",
        "location": "Southern Province, Sri Lanka",
        "category": "Beach",
        "description": "Enjoy beaches, historic buildings and beautiful sunsets.",
        "budget": "Medium",
        "image": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800"
    }
]


@router.get("/")
async def get_destinations():
    return {
        "success": True,
        "total": len(destinations),
        "destinations": destinations
    }


@router.get("/{destination_id}")
async def get_destination(destination_id: int):
    for destination in destinations:
        if destination["id"] == destination_id:
            return {
                "success": True,
                "destination": destination
            }

    return {
        "success": False,
        "message": "Destination not found"
    }