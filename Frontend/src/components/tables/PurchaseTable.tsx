import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'flowbite-react';
import API_SERVICE from 'src/utils/api-services';
import Swal from 'sweetalert2';
import { CoursePurchase } from 'src/types/course/course';

const PurchaseTable = () => {
  const [PurchasesTableData, setPurchasesTableData] = useState<CoursePurchase[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data from backend
  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_SERVICE.purchases}`);
      setPurchasesTableData(response.data.data);
    } catch (error: any) {
      Swal.fire({
        title: 'Error fetching purchases!',
        text: error.message,
        icon: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    console.log(PurchasesTableData);
  }, [PurchasesTableData]);

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex flex-row justify-between">
        <h5 className="card-title">Purchases</h5>
      </div>
      <div className="mt-3">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-6">Course</Table.HeadCell>
              <Table.HeadCell>User</Table.HeadCell>
              <Table.HeadCell>Purchase Date</Table.HeadCell>
              <Table.HeadCell>Expire Date</Table.HeadCell>
              <Table.HeadCell>Remaining Days</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {PurchasesTableData?.length > 0 ? (
                PurchasesTableData.map((purchase: CoursePurchase, index: number) => (
                  <Table.Row key={index}>
                    <Table.Cell>{purchase.courseId}</Table.Cell>
                    <Table.Cell>
                      {(purchase.userId ?? '').charAt(0).toUpperCase() +
                        (purchase.userId ?? '').slice(1)}
                    </Table.Cell>
                    <Table.Cell>
                      {purchase.purchaseDate
                        ? new Date(purchase.purchaseDate).toLocaleDateString()
                        : 'N/A'}
                    </Table.Cell>
                    <Table.Cell>
                      {purchase.expiryDate
                        ? new Date(purchase.expiryDate).toLocaleDateString()
                        : 'N/A'}
                    </Table.Cell>
                    <Table.Cell>
                      {purchase.expiryDate
                        ? Math.floor(
                            (new Date(purchase.expiryDate).getTime() - new Date().getTime()) /
                              (1000 * 3600 * 24),
                          )
                        : 'N/A'}
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : isLoading ? (
                <Table.Row>
                  <Table.Cell colSpan={5} className="text-center">
                    Loading...
                  </Table.Cell>
                </Table.Row>
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={5} className="text-center">
                    No Purchase data found
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export { PurchaseTable };
