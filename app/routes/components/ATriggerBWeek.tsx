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
import { Button } from '~/components/ui/button';
type ButtonContainerProps = {
  currentWeek: number;
  totalWeeks: number;
};

type ButtonProps = {
  Weekwindow: number;
  activeClass: boolean;
};
import {
  useLocation, useNavigate, useSearchParams, Link, replace, useFetcher
  
 } from 'react-router';
const ATriggerBWeek = () => {
   let fetcher = useFetcher();
    
  const handleSubmit = (newWeek: string) => {
      const formData = new FormData();
  formData.append('newWeek', newWeek);
        
            //e.preventDefault(); : React.FormEvent<HTMLFormElement>
            fetcher.submit(formData, { method: 'POST' });
            // window.location.reload()
        
    }
  
   const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation(); // like usePathname
  const navigate = useNavigate(); // like useRouter().push
  const displayedWeeks = ['s', 's']
  const currentWeek = Number(searchParams.get('week')) || 9;
   const totalWeeks = Number(searchParams.get('total')) || 9;
  
  
  const handleWeekChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newWeek = e.currentTarget.value
    console.log('newWeek', newWeek)
    const defaultParams = {
      week: searchParams.get('week') || '',
      newWeek: String(newWeek),
    };

    let params = new URLSearchParams(defaultParams);
    handleSubmit(newWeek)
   // navigate(`?${params.toString()}`, {replace: true});
  };
  //${location.pathname}
  const renderPagination = (): null[] => {
  return []
};
   return (
    <>
      
      <Pagination className='mt-16'>
        <PaginationContent className='bg-chasGray rounded-full'>
            <Button
            type='submit'
             onClick={(e) => {
               let prevPage = currentWeek - 1;
               if (prevPage < 1) prevPage = currentWeek;
               handleWeekChange(e);
              
             }
               
             }
             value= {currentWeek-1}
             defaultValue={currentWeek-1}
            aria-label='Next Page'>
            <span></span>
            <ChevronLeft className='h-4 w-4' />
          </Button>

     
          {renderPagination()}
         
            <Button
            type='button'
             onClick={(e) => {
                let nextPage = currentWeek + 1;
          if (nextPage > totalWeeks) nextPage = 1;
          handleWeekChange(e);
            }}
          
             aria-label='Next Page'
            value={currentWeek+1}
             defaultValue={currentWeek + 1} >
            
            <span></span>
            <ChevronRight className='h-4 w-4' />
          </Button>
        </PaginationContent>
      </Pagination>
    </>
  )
}

export default ATriggerBWeek