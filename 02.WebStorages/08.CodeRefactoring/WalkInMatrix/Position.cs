namespace WalkInMatrix
{
    using System;

    public class Position
    {
        public Position(int row, int col)
        {
            this.Row = row;
            this.Col = col;
        }

        public int Row { get; set; }

        public int Col { get; set; }

        public void Update(Delta delta)
        {
            this.Row += delta.Row;
            this.Col += delta.Col;
        }
    }
}
