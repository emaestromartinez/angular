import { rest } from 'msw';
// import * as faker from '@faker-js/faker';

export const GetFriendsGroup = [
  rest.get('/friends-group/:id', (req, res, ctx) => {
    const { id } = req.params;

    if (id === '500') {
      return res(
        ctx.status(500),
        ctx.json({
          data: {
            error: {
              code: 500,
              message: 'General error',
            },
          },
        })
      );
    }

    const mainResponse = {
      data: {
        id: 'fa41bcd2-579e-11ec-8b6e-d6667385ded6',
        members: [
          {
            id: 'person-1',
            name: 'Francisco Buyo',
            payments: [
              {
                id: '1',
                amount: '100,00',
                description: 'Cena',
                date: '1677060298243',
              },
            ],
          },
          {
            id: 'person-2',
            name: 'Alfonso Pérez',
            payments: [
              {
                id: '2',
                amount: '10,00',
                description: 'Taxi',
                date: '1677060298243',
              },
              {
                id: '3',
                amount: '53,40',
                description: 'Compra',
                date: '1677060298243',
              },
            ],
          },
        ],
      },
    };

    return res(ctx.json(mainResponse));
  }),
];
