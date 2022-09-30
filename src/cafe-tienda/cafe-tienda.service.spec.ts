import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { CafeTiendaService } from './cafe-tienda.service';
import { TiendaEntity } from '../tienda/tienda.entity';
import { CafeEntity } from '../cafe/cafe.entity';

describe('CafeTiendaService', () => {
  let service: CafeTiendaService;
  let tiendaRepository: Repository<TiendaEntity>;
  let cafeRepository: Repository<CafeEntity>;
  let tienda: TiendaEntity;
  let cafesList: CafeEntity[];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CafeTiendaService],
    }).compile();

    service = module.get<CafeTiendaService>(CafeTiendaService);
    tiendaRepository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
    cafeRepository = module.get<Repository<CafeEntity>>(getRepositoryToken(CafeEntity));
    await seedDatabase();
  });
  const seedDatabase = async () => {
    tiendaRepository.clear();
    cafeRepository.clear();

    cafesList = [];
    for (let i = 0; i < 5; i++) {
      var x = faker.commerce.price();
      var y: number = +x;
      const cafe: CafeEntity = await cafeRepository.save({
        nombre: faker.name.fullName(),
        descripcion: faker.lorem.lines(),
        precio: y,
      })
      cafesList.push(cafe);
    }

    tienda = await tiendaRepository.save({
      nombre: faker.name.firstName(),
      direccion: faker.address.direction(),
      telefono:faker.phone.number(),
      cafe: cafesList
    })
  }
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('addcafetienda should add a match to an adopter', async () => {
    const tiendap: TiendaEntity = await service.addCafetoTienda(tienda.id, cafesList[0].id);

  });
  it('addcafetienda should thrown exception for an invalid tienda', async () => {
    const tiendap: TiendaEntity = await service.addCafetoTienda("0", cafesList[0].id);

  });
  it('addcafetienda should thrown exception for an invalid cafe', async () => {
    const tiendap: TiendaEntity = await service.addCafetoTienda(tienda.id, "0");

  });
});
