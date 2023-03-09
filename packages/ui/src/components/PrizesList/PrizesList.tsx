import styled from '@emotion/styled';

const List = styled.div({
  display: 'flex',
  '@media (max-width: 600px)': {
    width: '100vw',
    overflow: 'auto',
    whiteSpace: 'nowrap',
    padding: '0 24px',
  },
});

const Item = styled.div({
  width: 130,
  height: 194,
  padding: '18px 5px 21px',
  background:
    'linear-gradient(180deg, rgba(255, 210, 200, 0.2) 0%, rgba(175, 193, 255, 0.2) 100%), url(https://assets.cms.freeport.dev.cere.network/image_light_background_for_card_5afaa33685.png)',
  backgroundSize: 'contain',
  borderRadius: 14.1951,
  '&:not(:last-child)': {
    marginRight: 8,
  },
});

const StyledImage = styled.img({
  maxWidth: 120,
  maxHeight: 120,
});

const Column = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  '& > span': {
    fontSize: 12,
    lineHeight: '15px',
    fontWeight: 500,
  },
});

const prizes: { title: string; url: string }[] = [
  {
    title: 'USDC',
    url: 'https://assets.cms.freeport.dev.cere.network/USDC_min_1_1_3af8dc7388.png',
  },
  {
    title: 'Unique NFTs',
    url: 'https://assets.cms.freeport.dev.cere.network/NFT_reward_example_1_cfac2fd769.png',
  },
  {
    title: 'Ticket pass',
    url: 'https://assets.cms.freeport.dev.cere.network/Ticket_pass_a4de6e9555.png',
  },
  {
    title: 'CERE tokens',
    url: 'https://assets.cms.freeport.dev.cere.network/image_frame_cere_tokens_eb3a81d231.png',
  },
];

export const PrizesList = () => (
  <List>
    {prizes.map(({ title, url }) => {
      return (
        <Item key={title}>
          <Column>
            <StyledImage src={url} alt={title} />
            <span>{title}</span>
          </Column>
        </Item>
      );
    })}
  </List>
);
