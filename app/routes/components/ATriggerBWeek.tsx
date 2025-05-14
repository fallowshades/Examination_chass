import React, { type ReactNode } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination"
import { ChevronLeft, ChevronRight } from 'lucide-react'
type ButtonContainerProps = {
  currentWeek: number;
  totalWeeks: number;
};

type ButtonProps = {
  Weekwindow: number;
  activeClass: boolean;
};
import { useLocation,useNavigate, useSearchParams,Link } from 'react-router';
const ATriggerBWeek = () => {
   const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation(); // like usePathname
  const navigate = useNavigate(); // like useRouter().push
   const displayedWeeks = ['s','s']
   
  
  
  const handleWeekChange = (page: number) => {
    const defaultParams = {
      week: searchParams.get('week') || '',
      page: String(page),
    };

    let params = new URLSearchParams(defaultParams);

    navigate(`${location}?${params.toString()}`);
  };
  
  const renderPagination = (): null[] => {
  return []
};
   return (
    <>
      <input
        type='hidden'
        name='formType'
        value='week'
      />
      <input
        type='hidden'
        name='week'
        // value={currentPage}
      />
      <Pagination className='mt-16'>
        <PaginationContent className='bg-chasGray rounded-full'>
           <Link
             to=''
            aria-label='Previous Page'>
            <ChevronLeft className='h-4 w-4' />
            <span></span>
          </Link>

     
          {renderPagination()}
         
           <Link
             to='ss'
            aria-label='Next Page'>
            <span></span>
            <ChevronRight className='h-4 w-4' />
          </Link>
        </PaginationContent>
      </Pagination>
    </>
  )
}

export default ATriggerBWeek