import { Box, Typography, Pagination } from "@mui/material";
import { IMetaData } from "../models/pragination.inteface";

interface IAppPaginationProps {
  metaData: IMetaData;
  onPageChange: (page: number) => void;
}

export const AppPagination = ({
  metaData,
  onPageChange,
}: IAppPaginationProps) => {
  const { currentPage, totalPages, pageSize, totalCount } = metaData;

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>
        Displaying {(currentPage - 1) * pageSize + 1} -&nbsp;
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}
        &nbsp;of {totalCount}
        &nbsp;items
      </Typography>
      <Pagination
        color="secondary"
        size="large"
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
      />
    </Box>
  );
};
