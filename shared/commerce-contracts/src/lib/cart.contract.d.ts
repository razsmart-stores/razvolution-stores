/**
 * @file cart.contract.ts
 * @description SSoT para el contrato de datos de la entidad Cart (Carrito).
 * @version 1.0.0 (Sovereign Creation)
 * @author IA Arquitecto
 */
import { z } from 'zod';
export declare const CartLineSchema: z.ZodObject<
  {
    id: z.ZodString;
    quantity: z.ZodNumber;
    merchandise: z.ZodObject<
      {
        id: z.ZodString;
        title: z.ZodString;
        price: z.ZodObject<
          {
            amount: z.ZodString;
            currencyCode: z.ZodString;
          },
          'strip',
          z.ZodTypeAny,
          {
            amount: string;
            currencyCode: string;
          },
          {
            amount: string;
            currencyCode: string;
          }
        >;
      },
      'strip',
      z.ZodTypeAny,
      {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
      },
      {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    id: string;
    quantity: number;
    merchandise: {
      id: string;
      title: string;
      price: {
        amount: string;
        currencyCode: string;
      };
    };
  },
  {
    id: string;
    quantity: number;
    merchandise: {
      id: string;
      title: string;
      price: {
        amount: string;
        currencyCode: string;
      };
    };
  }
>;
export declare const CartSchema: z.ZodObject<
  {
    id: z.ZodString;
    lines: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodString;
          quantity: z.ZodNumber;
          merchandise: z.ZodObject<
            {
              id: z.ZodString;
              title: z.ZodString;
              price: z.ZodObject<
                {
                  amount: z.ZodString;
                  currencyCode: z.ZodString;
                },
                'strip',
                z.ZodTypeAny,
                {
                  amount: string;
                  currencyCode: string;
                },
                {
                  amount: string;
                  currencyCode: string;
                }
              >;
            },
            'strip',
            z.ZodTypeAny,
            {
              id: string;
              title: string;
              price: {
                amount: string;
                currencyCode: string;
              };
            },
            {
              id: string;
              title: string;
              price: {
                amount: string;
                currencyCode: string;
              };
            }
          >;
        },
        'strip',
        z.ZodTypeAny,
        {
          id: string;
          quantity: number;
          merchandise: {
            id: string;
            title: string;
            price: {
              amount: string;
              currencyCode: string;
            };
          };
        },
        {
          id: string;
          quantity: number;
          merchandise: {
            id: string;
            title: string;
            price: {
              amount: string;
              currencyCode: string;
            };
          };
        }
      >,
      'many'
    >;
    cost: z.ZodObject<
      {
        totalAmount: z.ZodObject<
          {
            amount: z.ZodString;
            currencyCode: z.ZodString;
          },
          'strip',
          z.ZodTypeAny,
          {
            amount: string;
            currencyCode: string;
          },
          {
            amount: string;
            currencyCode: string;
          }
        >;
      },
      'strip',
      z.ZodTypeAny,
      {
        totalAmount: {
          amount: string;
          currencyCode: string;
        };
      },
      {
        totalAmount: {
          amount: string;
          currencyCode: string;
        };
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    id: string;
    lines: {
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
    cost: {
      totalAmount: {
        amount: string;
        currencyCode: string;
      };
    };
  },
  {
    id: string;
    lines: {
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
    cost: {
      totalAmount: {
        amount: string;
        currencyCode: string;
      };
    };
  }
>;
export type Cart = z.infer<typeof CartSchema>;
//# sourceMappingURL=cart.contract.d.ts.map
