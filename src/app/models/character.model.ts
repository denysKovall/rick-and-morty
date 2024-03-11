export type Characters = {
  id: string,
  episode?: [{ name?: string, __typename: string,  id: string  }],
  gender?: string,
  image: string,
  location?: { name?: string, __typename: string, id: string},
  name: string,
  origin?: { name?: string, __typename: string },
  species: string,
  status?: string,
  type?: string,
  __typename: string,
}
