import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { test, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteApp from '../components/NoteApp';
import { useNoteStore } from '../components/noteForm'

import axios from 'axios';

//vi.mock('axios');



describe('NoteApp', () => {

	beforeEach(() => {
		const { reset } = useNoteStore.getState();
		reset();
	});


	// test('couleur type', async () => {

	// 	render(<NoteApp />)


	// })

  test('affiche la liste des notes existantes',async  () => {
    render(<NoteApp />);
		// Ajoute 2 notes
		await userEvent.type(screen.getByTestId('input-title'), 'title 1')
		await userEvent.type(screen.getByTestId('input-note'), "16")
		await userEvent.type(screen.getByTestId('input-comment'), 'Note 1')
		await fireEvent.submit(screen.getByTestId('form'))
	
		await userEvent.type(screen.getByTestId('input-title'), 'title 2')
		await userEvent.type(screen.getByTestId('input-note'), "18")
		await userEvent.type(screen.getByTestId('input-comment'), 'Note 2')
		await fireEvent.submit(screen.getByTestId('form'))
	
    // Vérifie si les notes sont affichées
    expect(screen.getByText('Note 1')).toBeInTheDocument();
    expect(screen.getByText('Note 2')).toBeInTheDocument();
  });



  test('modifie une note existante',async () => {
    render(<NoteApp />);
	await userEvent.type(screen.getByTestId('input-title'), 'Titre de la note 1')
	await userEvent.type(screen.getByTestId('input-note'), "16")
	await userEvent.type(screen.getByTestId('input-comment'), 'Commentaire de la note 1')
	await fireEvent.submit(screen.getByTestId('form'))

    // Clique sur une note pour la modifier
    await fireEvent.click(screen.getByText('Modifier'));

    // Modifie le titre, le contenu et le commentaire de la note
	const title = screen.getByDisplayValue('Titre de la note 1');
    await userEvent.clear(title);
    await userEvent.type(title, 'Nouveau titre');
    /*await userEvent.clear(screen.getByDisplayValue("16"));
    await userEvent.type(screen.getByDisplayValue("16"), "17");
    await userEvent.clear(screen.getByDisplayValue('Commentaire de la note 1'));
    await userEvent.type(screen.getByDisplayValue('Commentaire de la note 1'), 'Nouveau commentaire');*/
    await fireEvent.click(screen.getByText('Enregistrer'));

	console.log(screen.debug())


    // Vérifie si la note a été modifiée
    expect(screen.getByText('Nouveau titre')).toBeInTheDocument();
    //expect(screen.getByText(17)).toBeInTheDocument();
    //expect(screen.getByText('Nouveau commentaire')).toBeInTheDocument();
  });

  test('supprime une note existante', async () => {
    render(<NoteApp />);

    await userEvent.type(screen.getByTestId('input-title'), 'Titre de la note 1')
    await userEvent.type(screen.getByTestId('input-note'), "16")
    await userEvent.type(screen.getByTestId('input-comment'), 'Commentaire de la note 1')
    await fireEvent.submit(screen.getByTestId('form'))

    // Clique sur une note pour la supprimer
    fireEvent.click(screen.getByText('Supprimer'));

    // Confirme la suppression de la note
    //fireEvent.click(screen.getByText('Ok'));

    // Vérifie si la note a été supprimée
    expect(screen.queryByText('Titre de la note 1')).not.toBeInTheDocument();
  });

  test.only('recherche des notes', async () => {
    render(<NoteApp />);

    await userEvent.type(screen.getByTestId('input-title'), 'Titre de la note 1')
    await userEvent.type(screen.getByTestId('input-note'), "16")
    await userEvent.type(screen.getByTestId('input-comment'), 'Commentaire de la note 1')
    await fireEvent.submit(screen.getByTestId('form'))

    await userEvent.type(screen.getByTestId('input-title'), 'Titre de la note 2')
    await userEvent.type(screen.getByTestId('input-note'), "16")
    await userEvent.type(screen.getByTestId('input-comment'), 'Commentaire de la note 2')
    await fireEvent.submit(screen.getByTestId('form'))

    await userEvent.type(screen.getByTestId('input-title'), 'Titre de la note 3')
    await userEvent.type(screen.getByTestId('input-note'), "16")
    await userEvent.type(screen.getByTestId('input-comment'), 'Commentaire de la note 3')
    await fireEvent.submit(screen.getByTestId('form'))

    // Saisit un terme de recherche
    userEvent.type(screen.getByTestId("input-search"), 'note 2');

    // Vérifie si seules les notes correspondantes au terme de recherche sont affichées
    expect(screen.getByText('Titre de la note 2')).toBeInTheDocument();
    expect(screen.queryByText('Titre de la note 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Titre de la note 3')).not.toBeInTheDocument();
  });

  test('trie les notes par date de création', async () => {
    render(<NoteApp />);

    await userEvent.type(screen.getByTestId('input-title'), 'Titre de la note 1')
    await userEvent.type(screen.getByTestId('input-note'), "16")
    await userEvent.type(screen.getByTestId('input-comment'), 'Commentaire de la note 1')
    await fireEvent.submit(screen.getByTestId('form'))

    await userEvent.type(screen.getByTestId('input-title'), 'Titre de la note 2')
    await userEvent.type(screen.getByTestId('input-note'), "16")
    await userEvent.type(screen.getByTestId('input-comment'), 'Commentaire de la note 2')
    await fireEvent.submit(screen.getByTestId('form'))

    await userEvent.type(screen.getByTestId('input-title'), 'Titre de la note 3')
    await userEvent.type(screen.getByTestId('input-note'), "16")
    await userEvent.type(screen.getByTestId('input-comment'), 'Commentaire de la note 3')
    await fireEvent.submit(screen.getByTestId('form'))

    // Sélectionne l'option de tri par date de création (ordre croissant)
    fireEvent.change(screen.getByTestId('sort-by-select'), { target: { value: 'creationDate' } });
    fireEvent.change(screen.getByTestId('sort-order-select'), { target: { value: 'asc' } });

    // Vérifie si les notes sont triées par date de création (ordre croissant)
    const noteTitles = screen.getAllByTestId('note-title').map((element) => element.textContent);
    expect(noteTitles).toEqual(['Titre de la note 1', 'Titre de la note 2', 'Titre de la note 3']);
  });

  test('trie les notes par note',async ()  => {
    render(<NoteApp />);

    await userEvent.type(screen.getByTestId('input-title'), 'Titre de la note 1')
    await userEvent.type(screen.getByTestId('input-note'), "16")
    await userEvent.type(screen.getByTestId('input-comment'), 'Commentaire de la note 1')
    await fireEvent.submit(screen.getByTestId('form'))

    await userEvent.type(screen.getByTestId('input-title'), 'Titre de la note 2')
    await userEvent.type(screen.getByTestId('input-note'), "16")
    await userEvent.type(screen.getByTestId('input-comment'), 'Commentaire de la note 2')
    await fireEvent.submit(screen.getByTestId('form'))

    await userEvent.type(screen.getByTestId('input-title'), 'Titre de la note 3')
    await userEvent.type(screen.getByTestId('input-note'), "16")
    await userEvent.type(screen.getByTestId('input-comment'), 'Commentaire de la note 3')
    await fireEvent.submit(screen.getByTestId('form'))

    // Sélectionne l'option de tri par note (ordre décroissant)
    fireEvent.change(screen.getByTestId('sort-by-select'), { target: { value: 'note' } });
    fireEvent.change(screen.getByTestId('sort-order-select'), { target: { value: 'desc' } });

    // Vérifie si les notes sont triées par note (ordre décroissant)
    const noteTitles = screen.getAllByTestId('note-title').map((element) => element.textContent);
    expect(noteTitles).toEqual(['Titre de la note 3', 'Titre de la note 2', 'Titre de la note 1']);
  });


});

