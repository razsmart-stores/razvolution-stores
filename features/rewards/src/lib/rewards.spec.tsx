import { render } from '@testing-library/react';

import RazvolutionRewards from './rewards';

describe('RazvolutionRewards', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RazvolutionRewards />);
    expect(baseElement).toBeTruthy();
  });
});
