import { toHaveAccessibleDescription } from "@testing-library/jest-dom/matchers";
import { useNoteStore } from "../components/noteForm";


describe('NoteApp', () => {

	beforeEach(() => {
		const { reset } = useNoteStore.getState();
		reset();
	});

  test('Test can add a note', () => {
    const { addNote } = useNoteStore.getState();

    addNote({
		id: 5,
		title: "title test",
		content: 14,
		comment: "comment test",
		creationDate: new Date("02/06/2023, 15:56:55").toLocaleString()
    });

    const { notes } = useNoteStore.getState();
    expect(notes).toMatchSnapshot();
  });


  test('Test can add multiple element in the notes array', () => {
    const { addNote } = useNoteStore.getState();

    addNote({
      id: 1,
      title: "title test 1",
      content: 14,
      comment: "comment test 1",
      creationDate: new Date('December 17, 1995 03:24:00').toLocaleString()
    });
    addNote({
      id: 2,
      title: "title test 2",
      content: 14,
      comment: "comment test 2",
      creationDate: new Date('December 17, 1995 03:24:00').toLocaleString()
    });

    const { notes } = useNoteStore.getState();
    expect(notes).toMatchSnapshot();
  });


  test('Test can delete a note in the notes array', () => {
    const { addNote, deleteNote } = useNoteStore.getState();

    addNote({
      id: 124,
      title: "title test 1",
      content: 14,
      comment: "comment test 1",
      creationDate: new Date().toLocaleString()
    });
    deleteNote(124);

    const { notes } = useNoteStore.getState();
    expect(notes).toEqual([]);
  });


  test('Test can delete a note in mutiple notes array', () => {
    const { addNote, deleteNote } = useNoteStore.getState();

    addNote({
      id: 1,
      title: "title test 1",
      content: 14,
      comment: "comment test 1",
      creationDate: new Date('December 17, 1995 03:24:00').toLocaleString()
    });
    addNote({
      id: 2,
      title: "title test 2",
      content: 14,
      comment: "comment test 2",
      creationDate: new Date('December 17, 1995 03:24:00').toLocaleString()
    });
    deleteNote(1);

    const { notes } = useNoteStore.getState();
    expect(notes).toMatchSnapshot();
  });


  test('Tests if it return an empty array when deleting an item from an empty array', () => {
    const { deleteNote } = useNoteStore.getState();
    deleteNote(1);

    const { notes } = useNoteStore.getState();
    expect(notes).toEqual([]);
  });


  test("test note gets updated properly", () => {
    const { addNote, updateNote } = useNoteStore.getState();

    addNote({
      id: 1,
      title: "comment test 1",
      content: 14,
      comment: "comment test 1",
      creationDate: new Date('December 17, 1995 03:24:00').toLocaleString()
    });

    updateNote(1, {
      id: 1,
      title: "title updated",
      content: 14,
      comment: "comment updated",
      creationDate: new Date('December 17, 1995 03:24:00').toLocaleString()
    })

    const { notes } = useNoteStore.getState();
    expect(notes).toMatchSnapshot();

  })


  test("test search", () => {
    const { addNote, setSearchTerm } = useNoteStore.getState();

    addNote({
      id: 1,
      title: "title test 1",
      content: 14,
      comment: "comment test 1",
      creationDate: new Date('December 17, 1995 03:24:00').toLocaleString()
    });
    addNote({
      id: 1,
      title: "text test 1",
      content: 14,
      comment: "comment test 1",
      creationDate: new Date('December 17, 1995 03:24:00').toLocaleString()
    });

    setSearchTerm("title");

    const { searchTerm } = useNoteStore.getState();
    expect(searchTerm).toEqual("title");
  })

  test("test sortby", () => {
    const { addNote, setSortBy } = useNoteStore.getState();

    addNote({
      id: 1,
      title: "title test 1",
      content: 14,
      comment: "comment test 1",
      creationDate: new Date('December 17, 1995 03:24:00').toLocaleString()
    });
    addNote({
      id: 1,
      title: "text test 1",
      content: 14,
      comment: "comment test 1",
      creationDate: new Date('December 17, 1995 03:24:00').toLocaleString()
    });

    setSortBy("Note");

    const { sortBy } = useNoteStore.getState();
    expect(sortBy).toEqual("Note");
  })

  test("test sortby", () => {
    const { addNote, setSortBy } = useNoteStore.getState();

    addNote({
      id: 1,
      title: "title test 1",
      content: 14,
      comment: "comment test 1",
      creationDate: new Date('December 17, 1995 03:24:00').toLocaleString()
    });
    addNote({
      id: 1,
      title: "text test 1",
      content: 14,
      comment: "comment test 1",
      creationDate: new Date('December 17, 1995 03:24:00').toLocaleString()
    });

    setSortBy("Note");

    const { sortBy } = useNoteStore.getState();
    expect(sortBy).toEqual("Note");
  })


})

