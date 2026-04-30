import { type Request, type Response, type NextFunction } from 'express';
import { IngredientService } from '../../services/IngredientService.js';
import { AppError } from '../../shared/errors/AppError.js';

export class IngredientController {
  private ingredientService: IngredientService;

  constructor() {
    this.ingredientService = new IngredientService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ingredients = await this.ingredientService.getAllIngredients();
      return res.status(200).json(ingredients);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const ingredient = await this.ingredientService.getIngredientById(id);
      return res.status(200).json(ingredient);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, unit, currentStock, minStock, averageCost } = req.body;

      const ingredient = await this.ingredientService.createIngredient({
        name,
        unit,
        currentStock: Number(currentStock),
        minStock: Number(minStock),
        averageCost: averageCost ? Number(averageCost) : undefined,
      });

      return res.status(201).json(ingredient);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name, unit, currentStock, minStock, averageCost } = req.body;

      const ingredient = await this.ingredientService.updateIngredient(id, {
        name,
        unit,
        currentStock: currentStock !== undefined ? Number(currentStock) : undefined,
        minStock: minStock !== undefined ? Number(minStock) : undefined,
        averageCost: averageCost !== undefined ? Number(averageCost) : undefined,
      });

      return res.status(200).json(ingredient);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.ingredientService.deleteIngredient(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

