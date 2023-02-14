// Imports
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useAxiosPrivate from "../../hooks/usePrivateAxios";
import Popup from "../../components/Popup";
import ReadOnlyRow from "../../components/dashboard components/ReadOnlyRow";
import EditableRow from "../../components/dashboard components/EditableRow";
import SearchRecord from "../../components/dashboard components/SearchRecord";
import Loading from "../../components/Loading";

// Records api URL
const RECORDS_URL = "";
// delete api url
const DELETE_URL = "delete/";

// Records Functional component
function Records() {
  // Constants for the states and miscallaneous
  const [deleteRecTrigger, setDeleteRecTrigger] = useState(false);
  const [deleteRecId, setDeleteRecId] = useState();

  let pageNumber = 1;
  let pageLimit = true;
  const [loadPage, setLoadPage] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState();
  const dataFetchedRef = useRef(false);
  const axiosPrivate = useAxiosPrivate();

  // Async Await axios request to the API for getting the records
  const getRecords = async () => {
    try {
      const response = await axiosPrivate.get(RECORDS_URL, {
        params: { page: pageNumber },
      });
      pageNumber++;
      setRecords((prevRecords) => {
        const newRecords = [...response?.data?.results];
        const isRecordUnique = (record) => {
          for (const prevRecord of prevRecords) {
            if (isObjectEqual(record, prevRecord)) {
              return false;
            }
          }
          return true;
        };
        const uniqueRecords = newRecords.filter(isRecordUnique);
        return [...prevRecords, ...uniqueRecords];
      });

      function isObjectEqual(a, b) {
        if (a === b) {
          return true;
        }

        if (
          a == null ||
          typeof a != "object" ||
          b == null ||
          typeof b != "object"
        ) {
          return false;
        }

        const keysA = Object.keys(a);
        const keysB = Object.keys(b);

        if (keysA.length !== keysB.length) {
          return false;
        }

        for (const key of keysA) {
          if (!b.hasOwnProperty(key)) {
            return false;
          }

          if (!isObjectEqual(a[key], b[key])) {
            return false;
          }
        }

        return true;
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        pageLimit = false;
      } else {
        console.error(err);
      }
    } finally {
      setLoadPage(false);
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.delete(`${DELETE_URL}${deleteRecId}/`);
      getRecords();
    } catch (err) {
      if (!err?.response) {
        console.log("NO SEVER RESPONSE");
      } else {
        console.log("SOMETHING WRONG");
      }
    }

    setDeleteRecTrigger(false);
  };

  // useEffect hook to run the getRecords function while component loads.
  useEffect(() => {
    window.scrollTo(0, 0);
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getRecords();
  }, []);

  const handleScroll = () => {
    setLoadPage(true);
    getRecords();
  };

  // const scrollRef = useRef(true);
  useEffect(() => {
    window.onscroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (pageLimit) {
          handleScroll();
        }
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  // Actual records JSX element.
  return (
    <RecordsWrapper>
      <RecWrapper>
        <SearchRecord setRecords={setRecords} setLoading={setLoading} />
        <RecordsArea>
          {loading ? (
            <Loading />
          ) : records.length !== 0 ? (
            Array.isArray(records) ? (
              <RecordsTable id="records">
                <Tbody>
                  <Tr className="headRow">
                    <Th>C.Number</Th>
                    <Th>C.Type</Th>
                    <Th>C.Company</Th>
                    <Th>From</Th>
                    <Th>To</Th>
                    <Th>Destination</Th>
                    <Th>Weight</Th>
                    <Th>Amount</Th>
                    <Th>Phone</Th>
                    <Th>Date</Th>
                    <Th>Time</Th>
                    <Th>Edit</Th>
                    <Th>Delete</Th>
                  </Tr>
                  {records.map((record, index) => {
                    return editId === record.courier_number ? (
                      <EditableRow
                        key={index}
                        record={record}
                        setEditId={setEditId}
                        getRecords={getRecords}
                      />
                    ) : (
                      <ReadOnlyRow
                        key={index}
                        record={record}
                        setEditId={setEditId}
                        setDeleteRecId={setDeleteRecId}
                        setDeleteRecTrigger={setDeleteRecTrigger}
                      />
                    );
                  })}
                </Tbody>
              </RecordsTable>
            ) : (
              <Exclam> You don't have permission! </Exclam>
            )
          ) : (
            <Exclam>❕No Records to show :(</Exclam>
          )}

          <LoadNext>
            <LoadNextPage className={loadPage ? "active rotate" : ""}>
              ⚙️
            </LoadNextPage>
          </LoadNext>
        </RecordsArea>

        <Popup
          trigger={deleteRecTrigger}
          setTrigger={setDeleteRecTrigger}
          actionName={`Delete ${deleteRecId}?`}
          actionFunc={handleDelete}
        />
      </RecWrapper>
    </RecordsWrapper>
  );
}
export default Records;

// Stylings
const RecordsWrapper = styled.div`
  padding-top: 5vh;
  min-height: 100vh;
  width: 100%;
  background: #2f3136;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: 0.3s ease;

  & > * {
    transition: 0.3s ease;
  }
`;

const RecWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RecordsArea = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadNext = styled.div`
  height: 10vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadNextPage = styled.span`
  font-size: 1.5rem;
  display: none;

  &.active {
    display: block;
  }

  &.rotate {
    animation: rotation 2s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

const Exclam = styled.div`
  height: 50vh;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RecordsTable = styled.table`
  font-size: 0.85rem;
  width: 90%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Tbody = styled.tbody`
  & Tr:nth-child(even) {
    background-color: #00000088;
  }

  & Th {
    top: 10vh;
    position: sticky;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Tr = styled.tr`
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 25px;
    border: 1px solid gray;

    &.headRow {
      display: none;
    }
  }
`;

const Th = styled.th`
  background: blue;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;
