'use client';

import { customTheme } from '@/custom-theme/Custom-Theme';
import { PaginationButtonsProps } from '@/types/types';
import { Flowbite, Pagination } from 'flowbite-react';

function PaginationButtons({show, setShow, totalPages } : PaginationButtonsProps) {

  const onPageChange = (page: number) => setShow(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Flowbite theme={{ theme: customTheme }}>
        <Pagination currentPage={show} totalPages={totalPages} onPageChange={onPageChange} showIcons />
      </Flowbite>
    </div>
  );
}

export default PaginationButtons;