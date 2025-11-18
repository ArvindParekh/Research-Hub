"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Loader2, Check, ChevronsUpDown } from "lucide-react";
import { addResearchInterest } from "@/actions/user/add-research-interests";
import { removeResearchInterest } from "@/actions/user/remove-research-interest";
import { getAllResearchInterests } from "@/actions/user/get-all-research-interests";
import { toast } from "sonner";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from "@/components/ui/command";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ResearchInterest {
   id: string;
   interest: string;
}

interface ResearchInterestsManagerProps {
   initialInterests: ResearchInterest[];
   onUpdate?: () => void;
}

export function ResearchInterestsManager({
   initialInterests,
   onUpdate,
}: ResearchInterestsManagerProps) {
   const [interests, setInterests] =
      useState<ResearchInterest[]>(initialInterests);
   const [allInterests, setAllInterests] = useState<
      { id: string; interest: string; userCount: number }[]
   >([]);
   const [open, setOpen] = useState(false);
   const [searchValue, setSearchValue] = useState("");
   const [isAdding, setIsAdding] = useState(false);
   const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
   const [isLoadingInterests, setIsLoadingInterests] = useState(false);

   useEffect(() => {
      async function loadAllInterests() {
         setIsLoadingInterests(true);
         try {
            const response = await getAllResearchInterests();
            if (response.success && response.data) {
               setAllInterests(response.data.interests);
            }
         } catch (error) {
            console.error("Error loading research interests:", error);
         } finally {
            setIsLoadingInterests(false);
         }
      }
      loadAllInterests();
   }, []);

   const handleAddInterest = async (interestName: string) => {
      const trimmedInterest = interestName.trim();

      if (!trimmedInterest) {
         toast.error("Please enter a research interest");
         return;
      }

      if (trimmedInterest.length > 100) {
         toast.error("Research interest must be less than 100 characters");
         return;
      }

      // check if already added
      if (
         interests.some(
            (i) => i.interest.toLowerCase() === trimmedInterest.toLowerCase()
         )
      ) {
         toast.error("Interest already added");
         return;
      }

      setIsAdding(true);
      try {
         const response = await addResearchInterest({
            interest: trimmedInterest,
         });

         if (response.success && response.data) {
            setInterests([...interests, response.data.interest]);
            setSearchValue("");
            setOpen(false);
            toast.success("Research interest added");
            onUpdate?.();

            // reload all interests to update counts
            const allResponse = await getAllResearchInterests();
            if (allResponse.success && allResponse.data) {
               setAllInterests(allResponse.data.interests);
            }
         } else {
            toast.error(response.message || "Failed to add research interest");
         }
      } catch (error) {
         console.error("Error adding research interest:", error);
         toast.error("An error occurred");
      } finally {
         setIsAdding(false);
      }
   };

   const handleRemoveInterest = async (interestId: string) => {
      setRemovingIds(new Set(removingIds).add(interestId));
      try {
         const response = await removeResearchInterest({ interestId });

         if (response.success) {
            setInterests(interests.filter((i) => i.id !== interestId));
            toast.success("Research interest removed");
            onUpdate?.();
         } else {
            toast.error(
               response.message || "Failed to remove research interest"
            );
         }
      } catch (error) {
         console.error("Error removing research interest:", error);
         toast.error("An error occurred");
      } finally {
         setRemovingIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(interestId);
            return newSet;
         });
      }
   };

   const availableInterests = allInterests.filter(
      (ai) => !interests.some((i) => i.id === ai.id)
   );

   const filteredInterests = searchValue
      ? availableInterests.filter((interest) =>
           interest.interest.toLowerCase().includes(searchValue.toLowerCase())
        )
      : availableInterests;

   const showCreateNew =
      searchValue.trim().length > 0 &&
      !allInterests.some(
         (i) => i.interest.toLowerCase() === searchValue.toLowerCase()
      );

   return (
      <div className='space-y-4'>
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className='w-full justify-between border-border hover:bg-muted/50 transition-colors'
                  disabled={isAdding}
               >
                  <span className='text-muted-foreground'>
                     {isAdding ? "Adding..." : "Add research interest..."}
                  </span>
                  {isAdding ? (
                     <Loader2 className='ml-2 h-4 w-4 shrink-0 animate-spin' />
                  ) : (
                     <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  )}
               </Button>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0' align='start'>
               <Command shouldFilter={false}>
                  <CommandInput
                     placeholder='Search or create new...'
                     value={searchValue}
                     onValueChange={setSearchValue}
                  />
                  <CommandList>
                     {isLoadingInterests ? (
                        <div className='flex items-center justify-center py-6'>
                           <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                        </div>
                     ) : (
                        <>
                           {filteredInterests.length === 0 &&
                              !showCreateNew && (
                                 <CommandEmpty>
                                    No research interests found.
                                 </CommandEmpty>
                              )}

                           {showCreateNew && (
                              <CommandGroup heading='Create New'>
                                 <CommandItem
                                    value={searchValue}
                                    onSelect={() =>
                                       handleAddInterest(searchValue)
                                    }
                                    className='cursor-pointer'
                                 >
                                    <Check className='mr-2 h-4 w-4 opacity-0' />
                                    <div className='flex flex-col'>
                                       <span>
                                          Create &quot;{searchValue}&quot;
                                       </span>
                                       <span className='text-xs text-muted-foreground'>
                                          New research interest
                                       </span>
                                    </div>
                                 </CommandItem>
                              </CommandGroup>
                           )}

                           {filteredInterests.length > 0 && (
                              <CommandGroup heading='Existing Interests'>
                                 {filteredInterests.map((interest) => (
                                    <CommandItem
                                       key={interest.id}
                                       value={interest.interest}
                                       onSelect={() =>
                                          handleAddInterest(interest.interest)
                                       }
                                       className='cursor-pointer'
                                    >
                                       <Check className='mr-2 h-4 w-4 opacity-0' />
                                       <div className='flex flex-col flex-1'>
                                          <span>{interest.interest}</span>
                                          <span className='text-xs text-muted-foreground'>
                                             {interest.userCount}{" "}
                                             {interest.userCount === 1
                                                ? "user"
                                                : "users"}
                                          </span>
                                       </div>
                                    </CommandItem>
                                 ))}
                              </CommandGroup>
                           )}
                        </>
                     )}
                  </CommandList>
               </Command>
            </PopoverContent>
         </Popover>

         {interests.length > 0 ? (
            <div className='flex flex-wrap gap-2'>
               {interests.map((interest) => {
                  const isRemoving = removingIds.has(interest.id);
                  return (
                     <div
                        key={interest.id}
                        className={cn(
                           "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all",
                           "bg-primary/10 text-primary border border-primary/20",
                           "hover:bg-primary/15 hover:border-primary/30"
                        )}
                     >
                        <span className='font-medium'>{interest.interest}</span>
                        <button
                           onClick={() => handleRemoveInterest(interest.id)}
                           disabled={isRemoving}
                           className={cn(
                              "hover:bg-primary/20 rounded-full p-0.5 transition-all",
                              "disabled:opacity-50 disabled:cursor-not-allowed",
                              "focus:outline-none focus:ring-2 focus:ring-primary/50"
                           )}
                           aria-label={`Remove ${interest.interest}`}
                        >
                           {isRemoving ? (
                              <Loader2 className='w-3 h-3 animate-spin' />
                           ) : (
                              <X className='w-3 h-3' />
                           )}
                        </button>
                     </div>
                  );
               })}
            </div>
         ) : (
            <div className='text-center py-8 border-2 border-dashed border-border rounded-lg'>
               <p className='text-sm text-muted-foreground'>
                  No research interests added yet.
               </p>
               <p className='text-xs text-muted-foreground mt-1'>
                  Click above to add your first interest
               </p>
            </div>
         )}
      </div>
   );
}
