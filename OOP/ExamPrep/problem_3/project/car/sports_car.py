from project.car.car import Car


class SportsCar(Car):
    MIN_SPEED_LIMIT = 400
    MAX_SPEED_LIMIT = 600
    MODEL = 'SportsCar'
    def __init__(self, model, speed_limit):
        super().__init__(model, speed_limit)

