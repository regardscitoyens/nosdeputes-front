import Filter from "@/components/search/Filter";
import {Container, Box} from "@mui/material";
import SearchBar from "@/components/search/SearchBar";
import ResultsContainer from "@/components/search/ResultsContainer";

export default function RecherchePage({searchParams}: {
	searchParams: { input?: string };
}) {
	const input = searchParams.input ?? "";

	return (
		<Container sx={{ py: 6 }}>
			<Box display="flex" gap={3}>
				<Filter input={input}/>
				<Box flex={1} display="flex" flexDirection="column">
					<SearchBar initialValue={input} />
					<ResultsContainer input={input} />
				</Box>
			</Box>
		</Container>
	);
}
