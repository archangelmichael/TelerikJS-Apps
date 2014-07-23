namespace TestWalkInMatrix
{
    using System;
    using WalkInMatrix;

    public class TestWalkInMatrix
    {
        private static int GetMatrixSize(int maxSize)
        {
            string input;
            int size;

            do
            {
                Console.WriteLine("Enter size of the matrix lower than {0}", maxSize);
                input = Console.ReadLine();
            }
            while (!int.TryParse(input, out size) || size < 1 || size > maxSize);

            return size;
        }

        private static void Main()
        {
            int size = GetMatrixSize(Matrix.MaxSize);

            Matrix matrix = new Matrix(size);

            matrix.Walk();

            Console.WriteLine(matrix);
        }
    }
}
