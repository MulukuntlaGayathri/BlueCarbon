import random

# Each tree planted offsets this many tons of CO2
CARBON_RATE_PER_TREE = 0.05

def calculate_carbon_credits(trees_planted: int) -> float:
    """
    Calculate estimated carbon credits based on number of trees planted.
    :param trees_planted: Number of trees planted
    :return: Carbon credits in tons
    """
    return trees_planted * CARBON_RATE_PER_TREE

def issue_carbon_credits(project_id: str, carbon_tons: float, user_address: str = "mock_user") -> tuple[str, str]:
    """
    Simulate issuing carbon credits on blockchain.
    :param project_id: Unique project identifier
    :param carbon_tons: Carbon credits in tons
    :param user_address: User wallet (mocked)
    :return: token_id, tx_hash
    """
    token_id = f"carbon-{project_id}-{random.randint(1000,9999)}"
    tx_hash = f"mock_tx_{random.randint(100000,999999)}"
    return token_id, tx_hash
