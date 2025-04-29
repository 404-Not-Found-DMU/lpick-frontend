'use client';

import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`flex items-center justify-center h-screen`}
`;

export default function WikiViewPage() {
  return <Container>wiki/view</Container>;
}
