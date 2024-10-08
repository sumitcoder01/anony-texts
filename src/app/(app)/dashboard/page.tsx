'use client'
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { User } from "next-auth";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/models/User";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { APIResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from 'axios';
import { useCopyToClipboard } from 'usehooks-ts'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RefreshIcon } from "@/components/icons/RefreshIcon";
import { CircularLoader } from "@/components/specific/CircularLoader";
import { MessagesListSkeleton } from "@/components/loaders/MessageListSkeleton";
import { MessagesList } from "@/components/specific/MessagesList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"



const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMessageLoading, setIsMessageLoading] = useState<boolean>(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const { toast } = useToast();
  const [copiedText, copy] = useCopyToClipboard();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const limit = 6;
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [isPageNumberLoading, setIsPageNumberLoading] = useState<boolean>(true);


  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter(message => message._id !== id));
  }

  const { register, watch, setValue } = useForm<z.infer<typeof AcceptMessageSchema>>({
    resolver: zodResolver(AcceptMessageSchema),
  });

  const acceptMessages = watch('acceptMessages');

  const fetchMessages = async (refresh: boolean = false, pageNumber = page) => {
    setIsMessageLoading(true);
    try {
      const response = await axios.get<APIResponse>(`/api/get-messages?page=${pageNumber}&limit=${limit}`);
      setMessages(response.data.messages || []);
      setTotalPages(response.data.totalPages || 1);
      if (refresh) {
        toast({
          title: 'Refreshed Messages',
          description: 'Showing latest messages',
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<APIResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to fetch messages',
        variant: 'destructive',
      });
    } finally {
      setIsMessageLoading(false);
    }
  }

  const fetchAcceptMessages = async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<APIResponse>('/api/accept-messages');
      setValue('acceptMessages', response.data?.isAcceptingMessages ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<APIResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ??
          'Failed to fetch message settings',
        variant: 'destructive',
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }


  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();
    fetchAcceptMessages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getPageNumbers = () => {
      let arr = [];
      for (let i = page - 3; i <= page + 3; i++) {
        if (i < 1) continue;
        else if (i > totalPages) break;
        arr.push(i);
      }
      setPageNumbers(arr);
    }
    getPageNumbers();
    if (totalPages !== 0) setIsPageNumberLoading(false);
  }, [page, totalPages]);

  const handleSwitchChange = async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.post<APIResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages,
      });
      setValue('acceptMessages', !acceptMessages);
      toast({
        title: response.data.message,
        variant: 'default',
      });
    } catch (error) {
      const axiosError = error as AxiosError<APIResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ??
          'Failed to update message settings',
        variant: 'destructive',
      });
    }
    finally {
      setIsSwitchLoading(false);
    }
  };


  if (!session || !session.user) {
    return <div></div>
  }

  const { username } = session.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const handleCopy = () => {
    copy(profileUrl)
      .then(() => {
        console.log("Copied Text", copiedText);
        toast({
          title: 'URL Copied!',
          description: 'Profile URL has been copied to clipboard.',
        });
      })
      .catch(error => {
        console.error('Failed to copy!', error);
        toast({
          title: 'Failed to copy! ',
          description: error,
        });
      })
  }

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setPage(pageNumber);
    fetchMessages(false, pageNumber);
  }

  return (
    <div className="w-full max-w-6xl my-8 mx-8 md:mx-6 lg:mx-auto bg-secondary dark:bg-black shadow-md rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-4" >User Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input value={profileUrl} disabled />
          <Button onClick={handleCopy}>Copy</Button>
        </div>
      </div>
      <div className="mb-8">
        {!isSwitchLoading ? <div className="flex items-center space-x-2">
          <Switch
            {...register('acceptMessages')}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            id="accept-messages" />
          <Label htmlFor="accept-messages">Accept Messages: {acceptMessages ? 'On' : 'Off'}</Label>
        </div>
          :
          <CircularLoader className="h-4 w-4 animate-spin" />
        }
      </div>
      <Separator className="my-2" />
      <Button
        className="mt-8"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }
        }
      >
        {isMessageLoading ? (
          <CircularLoader className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshIcon className="h-4 w-4" />
        )}
      </Button>
      <div className="my-4">
        {isMessageLoading ? <MessagesListSkeleton /> : <MessagesList messages={messages} handleDeleteMessage={handleDeleteMessage} />}
      </div>
      {!isPageNumberLoading && messages.length > 0 && <Pagination className="mt-14 mb-3">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
          </PaginationItem>
          {
            page - 3 > 1 && < PaginationItem >
              <PaginationEllipsis />
            </PaginationItem>
          }
          {
            pageNumbers.map(pageNumber => (<PaginationItem key={pageNumber}>
              <PaginationLink className={`${page === pageNumber && "font-bold text-md"}`} onClick={() => handlePageChange(pageNumber)}>{pageNumber}</PaginationLink>
            </PaginationItem>))
          }
          {
            page + 3 < totalPages && < PaginationItem >
              <PaginationEllipsis />
            </PaginationItem>
          }
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>}
    </div >
  )
}

export default Dashboard
