import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/lib/trpc";

export function PrivateData() {
  const { data, isLoading, error } = trpc.privateData.useQuery();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Private Data</CardTitle>
          <CardDescription>Loading protected data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-4">
            <Spinner size="lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Private Data</CardTitle>
          <CardDescription>Error loading protected data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">
            <p>Error: {error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Private Data</CardTitle>
        <CardDescription>Data from protected tRPC procedure</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-green-600">Message:</h4>
            <p className="text-lg">{data?.message}</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-600">User Info:</h4>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p><strong>Name:</strong> {data?.user.name}</p>
              <p><strong>Email:</strong> {data?.user.email}</p>
              <p><strong>ID:</strong> {data?.user.id}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 