import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: block;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
  span {
    filter: grayscale(100%);
  }
`;

function SingleBeer({ beer }) {
  const rating = Math.round(beer.rating.average);
  return (
    <SingleBeerStyles>
      <img src={beer.image} alt={beer.name} />
      <h2>{beer.name}</h2>
      {beer.price}
      <p title={`${rating} out of 5 stars`}>
        {`⭐`.repeat(rating)}
        <span>{`⭐`.repeat(5 - rating)}</span>
        <span>({beer.rating.reviews})</span>
      </p>
    </SingleBeerStyles>
  );
}

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;
  return (
    <>
      <h2 className="center">
        We have {beers.length} Beers Available. Dine in only!
      </h2>
      <BeerGridStyles>
        {beers.map((beer) => (
          <SingleBeer key={beer.id} beer={beer} />
        ))}
      </BeerGridStyles>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        rating {
          average
          reviews
        }
        image
      }
    }
  }
`;
