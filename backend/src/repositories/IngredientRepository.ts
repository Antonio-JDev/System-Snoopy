import { type Ingredient } from '@prisma/client';
import { prisma } from '../lib/prisma.js';

export class IngredientRepository {
  async findAll(): Promise<Ingredient[]> {
    try {
      return await prisma.ingredient.findMany({
        orderBy: {
          name: 'asc',
        },
      });
    } catch (error: any) {
      console.error('❌ Erro no IngredientRepository.findAll:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<Ingredient | null> {
    try {
      return await prisma.ingredient.findUnique({
        where: { id },
      });
    } catch (error: any) {
      console.error('❌ Erro no IngredientRepository.findById:', error);
      throw error;
    }
  }

  async findByName(name: string): Promise<Ingredient | null> {
    try {
      return await prisma.ingredient.findUnique({
        where: { name },
      });
    } catch (error: any) {
      console.error('❌ Erro no IngredientRepository.findByName:', error);
      throw error;
    }
  }

  async create(data: {
    name: string;
    unit: string;
    currentStock: number;
    minStock: number;
    averageCost?: number;
  }): Promise<Ingredient> {
    try {
      return await prisma.ingredient.create({
        data: {
          name: data.name,
          unit: data.unit,
          currentStock: data.currentStock,
          minStock: data.minStock,
          averageCost: data.averageCost || 0,
        },
      });
    } catch (error: any) {
      console.error('❌ Erro no IngredientRepository.create:', error);
      throw error;
    }
  }

  async update(
    id: string,
    data: {
      name?: string;
      unit?: string;
      currentStock?: number;
      minStock?: number;
      averageCost?: number;
    }
  ): Promise<Ingredient> {
    try {
      return await prisma.ingredient.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      console.error('❌ Erro no IngredientRepository.update:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.ingredient.delete({
        where: { id },
      });
    } catch (error: any) {
      console.error('❌ Erro no IngredientRepository.delete:', error);
      throw error;
    }
  }
}

