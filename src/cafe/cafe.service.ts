import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { CafeEntity } from './cafe.entity';

@Injectable()
export class CafeService {
    constructor(
        @InjectRepository(CafeEntity)
        private readonly cafeRepository: Repository<CafeEntity>
    ){}
    async createCafe(cafe: CafeEntity): Promise<CafeEntity> {
        if(cafe.precio>0){
            return await this.cafeRepository.save(cafe);
        }
        else{
            throw new BusinessLogicException("El precio debe ser positivo", BusinessError.BAD_REQUEST);
        }
    }
}
