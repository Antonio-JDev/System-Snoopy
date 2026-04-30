import { AppError } from '../shared/errors/AppError.js';
import { IngredientRepository } from '../repositories/IngredientRepository.js';
import { type Ingredient } from '@prisma/client';

export class IngredientService {
  private ingredientRepository: IngredientRepository;

  constructor() {
    this.ingredientRepository = new IngredientRepository();
  }

  async getAllIngredients(): Promise<Ingredient[]> {
    try {
      return await this.ingredientRepository.findAll();
    } catch (error) {
      console.error('❌ Erro no IngredientService.getAllIngredients:', error);
      throw new AppError('Erro ao buscar insumos', 500);
    }
  }

  async getIngredientById(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findById(id);

    if (!ingredient) {
      throw new AppError('Insumo não encontrado', 404);
    }

    return ingredient;
  }

  async createIngredient(data: {
    name: string;
    unit: string;
    currentStock: number;
    minStock: number;
    averageCost?: number;
  }): Promise<Ingredient> {
    // Validações
    if (!data.name || data.name.trim().length === 0) {
      throw new AppError('Nome do insumo é obrigatório', 400);
    }

    if (!data.unit || data.unit.trim().length === 0) {
      throw new AppError('Unidade de medida é obrigatória', 400);
    }

    if (data.currentStock < 0) {
      throw new AppError('Estoque atual não pode ser negativo', 400);
    }

    if (data.minStock < 0) {
      throw new AppError('Estoque mínimo não pode ser negativo', 400);
    }

    // Verificar se já existe insumo com o mesmo nome
    const existingIngredient = await this.ingredientRepository.findByName(data.name.trim());
    if (existingIngredient) {
      throw new AppError('Já existe um insumo com este nome', 409);
    }

    try {
      return await this.ingredientRepository.create({
        name: data.name.trim(),
        unit: data.unit.trim(),
        currentStock: data.currentStock,
        minStock: data.minStock,
        averageCost: data.averageCost || 0,
      });
    } catch (error: any) {
      console.error('❌ Erro no IngredientService.createIngredient:', error);
      
      // Erro de constraint do Prisma (nome duplicado)
      if (error.code === 'P2002') {
        throw new AppError('Já existe um insumo com este nome', 409);
      }
      
      throw new AppError('Erro ao criar insumo', 500);
    }
  }

  async updateIngredient(
    id: string,
    data: {
      name?: string;
      unit?: string;
      currentStock?: number;
      minStock?: number;
      averageCost?: number;
    }
  ): Promise<Ingredient> {
    // Verificar se o insumo existe
    await this.getIngredientById(id);

    // Se estiver atualizando o nome, verificar se não existe outro com o mesmo nome
    if (data.name) {
      const existingIngredient = await this.ingredientRepository.findByName(data.name.trim());
      if (existingIngredient && existingIngredient.id !== id) {
        throw new AppError('Já existe um insumo com este nome', 409);
      }
    }

    try {
      return await this.ingredientRepository.update(id, {
        ...(data.name && { name: data.name.trim() }),
        ...(data.unit && { unit: data.unit.trim() }),
        ...(data.currentStock !== undefined && { currentStock: data.currentStock }),
        ...(data.minStock !== undefined && { minStock: data.minStock }),
        ...(data.averageCost !== undefined && { averageCost: data.averageCost }),
      });
    } catch (error: any) {
      console.error('❌ Erro no IngredientService.updateIngredient:', error);
      
      if (error.code === 'P2002') {
        throw new AppError('Já existe um insumo com este nome', 409);
      }
      
      throw new AppError('Erro ao atualizar insumo', 500);
    }
  }

  async deleteIngredient(id: string): Promise<void> {
    // Verificar se o insumo existe
    await this.getIngredientById(id);

    try {
      await this.ingredientRepository.delete(id);
    } catch (error: any) {
      console.error('❌ Erro no IngredientService.deleteIngredient:', error);
      
      // Se houver relacionamentos, o Prisma lançará erro
      if (error.code === 'P2003') {
        throw new AppError('Não é possível excluir insumo com relacionamentos', 409);
      }
      
      throw new AppError('Erro ao excluir insumo', 500);
    }
  }
}

