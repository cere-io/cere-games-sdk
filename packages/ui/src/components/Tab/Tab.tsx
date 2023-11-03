import React from 'react';
import styled from '@emotion/styled';

import { Typography } from '../Typography';

const TabContainer = styled.div`
  display: flex;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  background: rgba(233, 204, 255, 0.1);
  border: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  & > div {
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 500;
    color: ${(props) => (props.isActive ? '#ffffff' : '#999')};
    border-bottom: none;
    cursor: pointer;

    &:hover {
      color: #ffffff;
    }
  }
  &:not(:first-child) {
    margin-left: 5px;
  }
`;

const TabPanel = styled.div``;

type TabsProps = {
  value: number;
  onChange: (newValue: number) => void;
  children: React.ReactNode;
};

export const Tabs: React.FC<TabsProps> = ({ value, onChange, children }) => {
  return (
    <TabContainer>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          onClick: () => onChange(index),
          isActive: value === index,
        }),
      )}
    </TabContainer>
  );
};

type TabProps = {
  isActive: boolean;
  label: string;
  onClick?: () => void;
};

export const Tab: React.FC<TabProps> = ({ isActive, label, onClick }) => {
  return (
    <TabButton isActive={isActive} onClick={onClick}>
      <Typography>{label}</Typography>
    </TabButton>
  );
};

type TabPanelProps = {
  value: number;
  index: number;
  children: React.ReactNode;
};

export const CustomTabPanel: React.FC<TabPanelProps> = ({ value, index, children }) => {
  return <TabPanel style={{ display: value === index ? 'block' : 'none' }}>{children}</TabPanel>;
};
