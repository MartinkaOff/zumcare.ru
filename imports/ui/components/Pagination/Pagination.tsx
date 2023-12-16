import React from "react";
import { Pagination } from "react-bootstrap";

interface PaginationProps {
	currentPage: number;
	itemsPerPage: number;
	data: any[]; // or specify the type of your data array
	onPageChange: (page: number) => void;
}

function PaginationComponent(props: PaginationProps) {
	const { currentPage, itemsPerPage, data, onPageChange } = props;
	const range = 2;
	const totalPages = Math.ceil(data.length / itemsPerPage);

	// explicitly annotate the type of pageNumbers to number[]
	const pageNumbers: number[] = [];

	for (let i = 1; i <= totalPages; i++) {
		if (
			i === 1 ||
			i === totalPages ||
			(i >= currentPage - range && i <= currentPage + range)
		) {
			pageNumbers.push(i);
		}
	}

	return (
		<Pagination>
			<Pagination.First
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
			/>
			<Pagination.Prev
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			/>

			{/* display ellipsis if there are more than range * 2 + 1 pages */}
			{pageNumbers[0] > 2 && <Pagination.Ellipsis />}

			{/* display page numbers */}
			{pageNumbers.map((page) => (
				<Pagination.Item
					key={page}
					active={page === currentPage}
					onClick={() => onPageChange(page)}
				>
					{page}
				</Pagination.Item>
			))}

			{/* display ellipsis if there are more than range * 2 + 1 pages */}
			{pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
				<Pagination.Ellipsis />
			)}

			<Pagination.Next
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			/>
			<Pagination.Last
				onClick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages}
			/>
		</Pagination>
	);
}

export default PaginationComponent;
