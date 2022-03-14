import React, { FC } from 'react';

import { CardHeader, Card, CardBody } from '@cenera/components/Card';

type Props = {
  title: string;
  text1: string;
  text2?: string;
};

export const LoadingOrError: FC<Props> = ({ title, text1, text2 }: Props) => {
  return (
    <Card>
      <CardHeader>
        <h4>{title}</h4>
      </CardHeader>
      <CardBody>
        <p>{text1}</p>
        <p>{text2}</p>
      </CardBody>
    </Card>
  );
};
