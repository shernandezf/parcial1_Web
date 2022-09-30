import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { TiendaEntity } from './tienda.entity';

@Injectable()
export class TiendaService {
    constructor(
        @InjectRepository(TiendaEntity)
        private readonly tiendaRepository: Repository<TiendaEntity>
    ){}
    async createTienda(tienda: TiendaEntity): Promise<TiendaEntity> {
        if(tienda.telefono.length==10){
            return await this.tiendaRepository.save(tienda);
        }
        else{
            throw new BusinessLogicException("El telefono debe tener 10 caracteres", BusinessError.BAD_REQUEST);
        }
    }
}
