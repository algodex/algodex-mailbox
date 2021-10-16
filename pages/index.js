import styled from 'styled-components'
import Layout from '../components/layout'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

export default function Home() {
  return <Layout>
    <Title/>
    Main Body 2
  </Layout>
}
