import { TypeOrmModule } from '@nestjs/typeorm';
import { TiendaEntity } from '../../tienda/tienda.entity';
import { CafeEntity } from '../../cafe/cafe.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [CafeEntity,TiendaEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([CafeEntity,TiendaEntity]),
];