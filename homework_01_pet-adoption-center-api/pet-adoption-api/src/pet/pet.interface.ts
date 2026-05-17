export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  status: 'available' | 'adopted';
}


export type CreatePet = Omit<Pet, 'id' | 'status'>;

export type UpdatePet = Omit<Pet, 'id' | 'status'>;

export type PartiallyUpdatePet =  Partial<Omit<Pet, 'id'>>;