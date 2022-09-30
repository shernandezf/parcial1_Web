import { Module } from '@nestjs/common';
import { CafeTiendaService } from './cafe-tienda.service';

@Module({
  providers: [CafeTiendaService]
})
export class CafeTiendaModule {}
