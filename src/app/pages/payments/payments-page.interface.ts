export interface FriendsGroup {
  id: string;
  members: Person[];
}

export interface Person {
  id: string;
  name: string;
  payments: Payment[];
}

export interface Payment {
  id: string; // Is this necessary?
  amount: string;
  description: string;
  date: string;
}

/*
  Notas:
    - Debería haber otra interface que sea "Actividad",
      cuya actividad tenga un subconjunto del grupo, y poder recopilar ahi los gastos de esa actividad en específico?
    - Necesito que la "description" sea un identificador de la actividad? O realmente no hace falta, solo importa el valor?

*/
