import { storefrontFetch } from "./client";

const CART_FRAGMENT = `#graphql
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            product {
              title
              handle
            }
          }
        }
      }
    }
  }
`;

const CART_CREATE = `#graphql
  ${CART_FRAGMENT}
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_ADD = `#graphql
  ${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_QUERY = `#graphql
  ${CART_FRAGMENT}
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
`;

export type CartLineInput = {
  merchandiseId: string;
  quantity: number;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
    subtotalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    nodes: Array<{
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        title: string;
        product: { title: string; handle: string };
      };
    }>;
  };
};

type UserErrors = Array<{ field?: string[] | null; message: string }>;

function assertNoUserErrors(errors: UserErrors | undefined) {
  if (errors?.length) {
    throw new Error(errors.map((e) => e.message).join("; "));
  }
}

export async function createCart(lines: CartLineInput[]): Promise<ShopifyCart> {
  const data = await storefrontFetch<{
    cartCreate: { cart: ShopifyCart | null; userErrors: UserErrors };
  }>(CART_CREATE, { lines });
  assertNoUserErrors(data.cartCreate.userErrors);
  if (!data.cartCreate.cart) throw new Error("Failed to create cart");
  return data.cartCreate.cart;
}

export async function addCartLines(
  cartId: string,
  lines: CartLineInput[],
): Promise<ShopifyCart> {
  const data = await storefrontFetch<{
    cartLinesAdd: { cart: ShopifyCart | null; userErrors: UserErrors };
  }>(CART_LINES_ADD, { cartId, lines });
  assertNoUserErrors(data.cartLinesAdd.userErrors);
  if (!data.cartLinesAdd.cart) throw new Error("Failed to update cart");
  return data.cartLinesAdd.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await storefrontFetch<{ cart: ShopifyCart | null }>(CART_QUERY, {
    cartId,
  });
  return data.cart;
}

export async function ensureCartWithLines(
  cartId: string | undefined,
  lines: CartLineInput[],
): Promise<ShopifyCart> {
  if (!cartId) {
    return createCart(lines);
  }
  try {
    const existing = await getCart(cartId);
    if (!existing) return createCart(lines);
    return addCartLines(cartId, lines);
  } catch {
    return createCart(lines);
  }
}
