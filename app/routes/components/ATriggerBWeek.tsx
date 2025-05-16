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
  page: number;
  activeClass: boolean;
};
import {
  useLocation, useNavigate, useSearchParams, Link, replace, useFetcher
  ,useSubmit
} from 'react-router';
 import { useState } from 'react';
const ATriggerBWeek = ({currentWeek}:{currentWeek:number}) => {
   let fetcher = useFetcher();
        const submit = useSubmit()
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
 
   const totalWeeks = Number(searchParams.get('total')) || 10;
  
  
  const handleWeekChange = (newWeek: number) => {
   
      setSearchParams((prev) => {
    const updated = new URLSearchParams(prev);
    updated.set('week', String(newWeek));
    return updated;
  });
    handleSubmit(String(newWeek))
    
   
  };
  //${location.pathname}
    const addPageButton = ({ page, activeClass }: ButtonProps) => {
    return (
      <Button
        key={page}
        size='icon'
        variant={activeClass ? 'default' : 'outline'}
        onClick={() => handleWeekChange(page)}
      >
        {page}
      </Button>
    );
    };
  
   const renderPageButtons = () => {
    const pageButtons = [];
    // first page
   
      for (let i = 1; i <= totalWeeks; i++) {
    pageButtons.push(addPageButton({ page: i, activeClass: i === currentWeek }));
  }

    return pageButtons;
  };
   return (
    <>
      
      <Pagination className='mt-16'>
        <PaginationContent className='bg-chasGray rounded-full'>
            <Button
            type='submit'
             onClick={() => {
               let prevPage = currentWeek - 1;
               if (prevPage < 1) prevPage = currentWeek;
               handleWeekChange(prevPage);
              
             }
               
             }
             value= {currentWeek-1}
             defaultValue={currentWeek-1}
            aria-label='Next Page'>
            <span></span>
            <ChevronLeft className='h-4 w-4' />
          </Button>

     
          {renderPageButtons()}
         
            <Button
            type='button'
             onClick={() => {
                let nextPage = currentWeek + 1;
          if (nextPage > totalWeeks) nextPage = 1;
          handleWeekChange(nextPage);
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