export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
   __typename?: 'Mutation';
  createNote: Note;
  editNote?: Maybe<Note>;
};


export type MutationCreateNoteArgs = {
  title: Scalars['String'];
  content: Scalars['String'];
};


export type MutationEditNoteArgs = {
  id: Scalars['Int'];
  title: Scalars['String'];
  content: Scalars['String'];
};

export type Note = {
   __typename?: 'Note';
  id: Scalars['Int'];
  title: Scalars['String'];
  content: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  notes?: Maybe<Array<Maybe<Note>>>;
  note?: Maybe<Note>;
};


export type QueryNoteArgs = {
  id: Scalars['String'];
};
