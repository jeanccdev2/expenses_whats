import { injectable } from "inversify";
import { AppDataSource } from "../database/sources/postgres";
import { Sales } from "../database/entities/Sales";
import { Repository } from "typeorm";

export interface ISalesRepository {
  save(
    name: string,
    amount: number,
    category?: string,
    description?: string
  ): Promise<void>;
}

@injectable()
export class SalesRepository implements ISalesRepository {
  private readonly salesRepository: Repository<Sales>;

  constructor() {
    this.salesRepository = AppDataSource.getRepository(Sales);
  }

  async save(
    name: string,
    amount: number,
    category?: string,
    description?: string
  ): Promise<void> {
    await this.salesRepository.save({
      name,
      category,
      amount,
      description,
    });
  }
}
