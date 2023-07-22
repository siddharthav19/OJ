#include <bits/stdc++.h>
using namespace std;
void run()
{
	int n, x;
	cin >> n >> x;
	vector<int> values(n);
	for (int i = 0; i < n; i++)
	{
		cin >> values[i];
	}
	map<int, int> val_to_ind;
	for (int i = 0; i < n; i++)
	{
		if (val_to_ind.count(x - values[i]))
		{
			cout << i + 1 << " " << val_to_ind[x - values[i]] << endl;
			return;
		}
		val_to_ind[values[i]] = i + 1;
	}
	cout << "IMPOSSIBLE" << endl;
}
int main()
{
	int _t;
	cin >> _t;
	while (_t--)
		run();
}
