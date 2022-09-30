import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { TiendaService } from './tienda.service';
import { TiendaEntity } from './tienda.entity';

describe('TiendaService', () => {
  let service: TiendaService;
  let repository: Repository<TiendaEntity>;
  let tiendaList: TiendaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TiendaService],
    }).compile();

    service = module.get<TiendaService>(TiendaService);
    repository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
    //await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('create should return a new tienda', async () => {
    const tienda: TiendaEntity = {
      id: '',
      nombre: faker.name.firstName(),
      direccion: faker.address.direction(),
      telefono:faker.phone.number(),
      cafes:null
    }

    const newTienda: TiendaEntity = await service.createTienda(tienda);

    expect(newTienda).not.toBeNull();

    const storedTienda: TiendaEntity = await repository.findOne({ where: { id: newTienda.id } })
    expect(storedTienda).not.toBeNull();
    expect(storedTienda.nombre).toEqual(newTienda.nombre)
    expect(storedTienda.direccion).toEqual(newTienda.direccion)
    expect(storedTienda.telefono).toEqual(newTienda.telefono)
  });
  it('create should throw an exception for an invalid telefono', async () => {
    const tienda: TiendaEntity = {
      id: '',
      nombre: faker.name.firstName(),
      direccion: faker.address.direction(),
      telefono:"31002",
      cafes:null
    }
    //const newCafe: CafeEntity = await service.createCafe(cafe);
    await expect(() => service.createTienda(tienda)).rejects.toHaveProperty("message", "El telefono debe tener 10 caracteres")

  });
  
});
