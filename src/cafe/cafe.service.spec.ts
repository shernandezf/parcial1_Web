import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CafeService } from './cafe.service';
import { faker } from '@faker-js/faker';
import { CafeEntity } from './cafe.entity';


describe('CafeService', () => {
  let service: CafeService;
  let repository: Repository<CafeEntity>;
  let cafesList: CafeEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CafeService],
    }).compile();

    service = module.get<CafeService>(CafeService);
    repository = module.get<Repository<CafeEntity>>(getRepositoryToken(CafeEntity));
    await seedDatabase();
  });
  const seedDatabase = async () => {
    repository.clear();
    cafesList = [];
    
    for (let i = 0; i < 5; i++) {
      var x = faker.commerce.price();
      var y: number = +x;
      const cafe: CafeEntity = await repository.save({
        nombre: faker.name.fullName(),
        descripcion: faker.lorem.lines(),
        precio: y,
        
      })
      cafesList.push(cafe);
    }
  }
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('create should return a new cafe', async () => {
    const cafe: CafeEntity = {
      id:'',
      nombre: faker.name.fullName(),
      descripcion: faker.lorem.lines(),
      precio: 5,
      tiendas:null,
    }
    const newCafe: CafeEntity = await service.createCafe(cafe);

    expect(newCafe).not.toBeNull();

    const storedCafe: CafeEntity = await repository.findOne({ where: { id: newCafe.id } })
    expect(storedCafe).not.toBeNull();
    expect(storedCafe.nombre).toEqual(newCafe.nombre)
    expect(storedCafe.descripcion).toEqual(newCafe.descripcion)
    expect(storedCafe.precio).toEqual(newCafe.precio)

  });
  it('create should throw an exception for an invalid price', async () => {
    const cafe: CafeEntity = {
      id:'',
      nombre: faker.name.fullName(),
      descripcion: faker.lorem.lines(),
      precio: -5,
      tiendas:null,
    }
    //const newCafe: CafeEntity = await service.createCafe(cafe);
    await expect(() => service.createCafe(cafe)).rejects.toHaveProperty("message", "El precio debe ser positivo")

  });
  
});
